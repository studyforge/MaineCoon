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

# Création d'un subnet privé
resource "aws_subnet" "mainecoon-subnet" {
  vpc_id                  = aws_vpc.mainecoon-vpc.id
  cidr_block              = "172.16.1.0/24"

  map_public_ip_on_launch = false
  tags = {
    Name = "mainecoon-subnet"
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
resource "aws_db_subnet_group" "mainecoon-subnet_group" {
  name       = "my-subnet-group"
  subnet_ids = [aws_subnet.mainecoon-subnet.id]

  tags = {
    Name = "mainecoon-subnet_group"
  }
}

# Créer l'instance RDS PostgreSQL (privée)
resource "aws_db_instance" "mainecoon-db" {
  instance_class       = "db.t3.micro"
  storage_type         = "gp3"
  allocated_storage    = 10
  engine               = "postgres"
  engine_version       = "17.2"
  db_name              = var.rds_db_name
  username             = var.rds_username
  password             = var.rds_password
  publicly_accessible  = false
  db_subnet_group_name = aws_db_subnet_group.mainecoon-subnet_group.name
  vpc_security_group_ids = [aws_security_group.mainecoon-sg_group.id]

  tags = {
    Name = "mainecoon-db"
  }
}