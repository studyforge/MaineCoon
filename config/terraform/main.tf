# Docker
resource "docker_hub_repository" "mainecoon-app" {
  namespace = var.namespace
  name      = "mainecoon-app"
  private   = false
}

# Création du VPC
resource "aws_vpc" "mainecoon-vpc" {
  cidr_block = "172.16.0.0/16"

  tags = {
    Name = "mainecoon-vpc"
  }
}

# Création d'une Internet Gateway
resource "aws_internet_gateway" "mainecoon-igw" {
  vpc_id = aws_vpc.mainecoon-vpc.id
  
  tags = {
    Name = "mainecoon-igw"
  }
}

# Création d'un subnet privé #1
resource "aws_subnet" "mainecoon-subnet-1" {
  vpc_id                  = aws_vpc.mainecoon-vpc.id
  cidr_block              = "172.16.1.0/24"

  map_public_ip_on_launch = false
  availability_zone = "us-east-1a"
  tags = {
    Name = "mainecoon-subnet-1"
  }
}

# Création d'un subnet privé #2
resource "aws_subnet" "mainecoon-subnet-2" {
  vpc_id                  = aws_vpc.mainecoon-vpc.id
  cidr_block              = "172.16.2.0/24"

  map_public_ip_on_launch = false
  availability_zone = "us-east-1b"
  tags = {
    Name = "mainecoon-subnet-2"
  }
}

# Création d'un groupe de sécurité pour la RDS avec accès uniquement à partir du VPC
resource "aws_security_group" "mainecoon-sg-db" {
  name_prefix = "mainecoon-sg"
  description = "Security group for RDS PostgreSQL"
  vpc_id      = aws_vpc.mainecoon-vpc.id

  # Autoriser le trafic entrant sur le port 5432 (PostgreSQL) mais seulement depuis le VPC interne
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["172.16.0.0/16"]
  }

  # Autoriser le trafic sortant
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "mainecoon-sg-db"
  }
}

# Créer un groupe de sous-réseaux pour la DB
resource "aws_db_subnet_group" "mainecoon-subnet_group-1" {
  name       = "mainecoon-subnet_group-1"
  subnet_ids = [aws_subnet.mainecoon-subnet-1.id, aws_subnet.mainecoon-subnet-2.id]

  tags = {
    Name = "mainecoon-subnet_group-1"
  }
}

# Créer l'instance RDS PostgreSQL (privée)
resource "aws_db_instance" "mainecoon-db" {
  instance_class       = "db.t3.micro"
  storage_type         = "gp3"
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "17.2"
  db_name              = var.rds_db_name
  username             = var.rds_username
  password             = var.rds_password
  publicly_accessible  = false
  multi_az             = false
  db_subnet_group_name = aws_db_subnet_group.mainecoon-subnet_group-1.name
  vpc_security_group_ids = [aws_security_group.mainecoon-sg-db.id]

  tags = {
    Name = "mainecoon-db"
  }
}

resource "aws_eks_cluster" "eks" {
  name     = var.cluster_name
  role_arn = data.labrole.arn
  version  = "1.32"

  access_config {
    authentication_mode = "API"
  }

  vpc_config {
    subnet_ids = aws_subnet.eks_subnet[*].id
  }
  
}